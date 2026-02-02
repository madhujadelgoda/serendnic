# serendnic
![CI](https://github.com/madhujadelgoda/serendnic/actions/workflows/ci.yml/badge.svg)
![npm](https://img.shields.io/npm/v/serendnic)
![license](https://img.shields.io/npm/l/serendnic)
> Sri Lankan NIC validation & parsing, done right.

**serendnic** is a lightweight, TypeScript-first utility library for validating and parsing Sri Lankan National Identity Card (NIC) numbers in frontend and backend applications.

It supports both legacy and modern NIC formats, extracts date of birth and gender, and provides structured validation errors for safe production use.

---

## Features

- Detect NIC format (old / new)
- Strict validation rules
- Gender & DOB extraction
- Leap-year aware date handling
- Structured error codes
- Safe parsing API (no-throw option)
- TypeScript-first design
- Works in Node.js & browsers
- Tiny bundle size

---

## Installation

```bash
npm install serendnic
```
## Usage

```ts
import {
  detectNICFormat,
  validateNIC,
  parseNIC
} from "serendnic";

detectNICFormat("199012345678");
// → "NEW"

validateNIC("199012345678");
// → { valid: true }

parseNIC("199012345678");
/*
{
  format: "NEW",
  birthYear: 1990,
  dayOfYear: 123,
  dateOfBirth: "1990-05-03",
  gender: "MALE",
  serial: "4567",
  isValid: true
}
*/

```

## Safe Parsing (No Exceptions)

```ts
import { parseNICSafe } from "serendnic";

const result = parseNICSafe("123");

if (!result.ok) {
  console.error(result.error.code);
} else {
  console.log(result.data);
}

```

## Supported Formats

- New NIC
```bash
YYYYDDDSSSS

```

- Old NIC
```bash
YYDDDSSSSV | X

```

## Roadmap

Planned future features:

React hook helpers

Zod / Yup schema adapters

CLI validator

Input masking helpers

Browser demo playground

Additional Sri Lankan utilities

## Contributing

Contributions are welcome!

Please:

Fork the repo

Create a feature branch

Add tests

Submit a pull request

For major changes, open an issue first to discuss what you'd like to add.