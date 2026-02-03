# serendnic

![CI](https://github.com/madhujadelgoda/serendnic/actions/workflows/ci.yml/badge.svg)
![npm](https://img.shields.io/npm/v/serendnic)
![license](https://img.shields.io/npm/l/serendnic)

> 🇱🇰 Sri Lankan NIC validation, parsing & explanation — done right.

**serendnic** is a TypeScript-first utility library for working with Sri Lankan National Identity Card (NIC) numbers in frontend and backend applications.

It supports **old and new formats**, extracts **DOB & gender**, enforces **official structure rules**, provides **safe APIs**, and includes a powerful **`explainNIC()`** helper for auditing and debugging.

---

## Features

- Detect NIC format (OLD / NEW)
- Strict validation rules
- Leap-year aware DOB calculation
- Gender extraction
- Official NEW-NIC `0` digit enforcement
- Safe parsing API (`parseNICSafe`)
- Detailed NIC breakdown (`explainNIC`)
- Structured error codes
- TypeScript-first
- Works in Node & browsers
- Tiny bundle size

---

## Installation

```bash
npm install serendnic

```
## Basic Usage

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
## Explain a NIC (Debugging / Auditing)

```ts
import { explainNIC } from "serendnic";

const info = explainNIC("200125302976");

console.log(info);

```
- Example output:

```ts
{
  nic: "200125302976",
  format: "NEW",
  raw: {
    yearPart: "NEW",
    dayCode: 253,
    serial: "2976",
    suffix: undefined
  },
  derived: {
    birthYear: 2001,
    isLeapYear: false,
    gender: "MALE",
    genderOffsetApplied: false,
    dayOfYear: 253,
    dateOfBirth: "2001-09-10",
    month: 9,
    day: 10
  }
}

```

## Supported Formats

- NEW NIC (Post-2016)
```bash
YYYYDDD0NNNN

```
YYYY → birth year

DDD → day-of-year (001–366 male, 501–866 female)

0 → mandatory digit

NNNN → serial

---

- Old NIC
```bash
YYDDDSSSSV | X

```
YY → 1900 + year

V/X → suffix

## Roadmap

Planned future features:

CLI validator

React hooks

Zod / Yup adapters

Input masking helpers

Browser playground

NIC encoding utilities

VS Code extension

## Contributing

Contributions are welcome!

Please:

Fork the repo

Create a feature branch

Add tests

Submit a pull request

For major changes, open an issue first to discuss what you'd like to add.