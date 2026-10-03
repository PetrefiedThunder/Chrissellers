#!/usr/bin/env python3
"""Run a local QA command with UTC timestamps and sanitized, durable output."""
import datetime
import os
from pathlib import Path
import re
import shlex
import subprocess
import sys
import time

ROOT = Path(__file__).resolve().parents[3]
QA = Path(__file__).resolve().parent


def utc():
    return datetime.datetime.now(datetime.timezone.utc).isoformat(timespec="seconds")


def redact(text):
    text = re.sub(r"(?i)(authorization\s*[:=]\s*(?:bearer\s+)?)[^\s]+", r"\1[REDACTED]", text)
    text = re.sub(r"\b(?:gh[pousr]_[A-Za-z0-9_]{20,}|sk-[A-Za-z0-9_-]{20,}|AKIA[A-Z0-9]{16})\b", "[REDACTED]", text)
    return text


def append(path, text):
    with path.open("a") as stream:
        stream.write(text)


def main():
    group, label, *command = sys.argv[1:]
    if group not in {"ROOT", "BE", "FE", "UX"} or not re.fullmatch(r"[a-zA-Z0-9_-]+", label) or not command:
        raise SystemExit("usage: run_logged.py ROOT|BE|FE|UX safe-label command [args...]")
    output = QA / "artifacts" / f"{group}-{label}.txt"
    output.parent.mkdir(parents=True, exist_ok=True)
    start = utc()
    entry = f"\n- {start} [{group}] START `{shlex.join(command)}`; output: `artifacts/{output.name}`\n"
    append(QA / "SESSION-LOG.md", entry)
    append(QA / f"{group}-LOG.md", entry)
    allowed = {"PATH", "HOME", "TMPDIR", "LANG", "LC_ALL", "PW_TEST_CONNECT_WS_ENDPOINT"}
    env = {key: value for key, value in os.environ.items() if key in allowed}
    env.update({"CI": "1", "NEXT_TELEMETRY_DISABLED": "1", "NO_COLOR": "1"})
    clock = time.monotonic()
    with output.open("w") as report:
        report.write(f"Started: {start}\nCommand: {shlex.join(command)}\n\n")
        report.flush()
        process = subprocess.Popen(command, cwd=ROOT, env=env, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
        try:
            for line in process.stdout:
                clean = redact(line)
                report.write(clean)
                report.flush()
                print(clean, end="", flush=True)
            code = process.wait()
        except KeyboardInterrupt:
            process.terminate()
            code = process.wait()
        end = utc()
        result = f"\n- {end} [{group}] END `{label}`: exit {code}; elapsed {time.monotonic() - clock:.1f}s.\n"
        report.write(result)
    append(QA / "SESSION-LOG.md", result)
    append(QA / f"{group}-LOG.md", result)
    return code


if __name__ == "__main__":
    sys.exit(main())
