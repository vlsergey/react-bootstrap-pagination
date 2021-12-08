# @vlsergey/react-bootstrap-pagination

Ready-to-use wrapper for react-bootstrap Pagation component.

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads][downloads-image]][downloads-url]

# Goal
Do not duplicate same code of for [Pagination](https://react-bootstrap.github.io/components/pagination/) usage in different projects.

# Installation
```
npm i --save @vlsergey/react-bootstrap-pagination
```
or
```
npm i --save-dev @vlsergey/react-bootstrap-pagination
```

# Usage
```jsx
<Pagination value={5} totalPages={10} readOnly />

<Pagination value={5} totalPages={10} onChange={this.handleChange} />
```
*Important note*: value is 0-based unless changed with `firstPageValue`.

# Props
| Property         | Default value | Description |
| ---------------- |:-------------:| ----------- |
| **`value`**      | *required*    | Current page. Value is 0-based unless changed with `firstPageValue`. Displayed page label is `value - firstPageValue + 1`. |
| `totalPages`     | `undefined`   | Total number of pages. |
| **`onChange`**   |               | Should be provided if not `readOnly` or `disabled`. See below. |
| `name`           | `'page'`      | Name of component returned in `target` structure in `onChange`. |
| `readOnly`       | `false`       | Allow or do not allow user to change values by clicking on items. |
| `disabled`       | `false`       | Technically the same as `readOnly`, but appearance may change in future versions. |
| `firstPageValue` | `0`           | Internal value of first page (first page index) used by `value` and `onChange` attributes. Usually `0` (default) or `1`. |
| `showFirstLast`  | `true`        | Show or hide '<<' and '>>' items ( `<Pagination.First>` and `<Pagination.Last>` ) |
| `showPrevNext`   | `true`        | Show or hide '<' and '>' items  ( `<Pagination.Prev>` and `<Pagination.Next>` ) |
| `atBeginEnd`     | `2`           | How many first and last pages links to display (in addition to '<<' and '>>') |
| `aroundCurrent`  | `1`           | How many prev and next linkes to display (in addition to '<<' and '>>') |

The argument of `onChange` is event-alike structure with `target` property (with `name` and `value` subproperties). If one stores page number in state he can use same method as for usual form field:
```js
handlePageChange( { target: { value } } ) {
  this.setState( { page: value } );
}
```
If you have other fields (like page size), you can specify `name` property of `<Pagination />` and use single handler:

```jsx
class MyComponent extends PureComponent {
  state = {
    page: 0,
    size: 10,
  }

  handleChange( {target: {name, value }} ) {
    this.setState( { [name]: value } );
  }

  render() {
    const { page, size } = this.state;
    return <>
      <Pagination name="page" value={page} onChange={this.handleChange} />
      <select name="size" value={size} onChange={this.handleChange}>
        <option>5</option>
        <option>10</option>
        <option>25</option>
        <option>50</option>
      </select>
    </>
  }
}
```

# Examples
```jsx
<Pagination value={7} totalPages={15} />
```
![](https://raw.githubusercontent.com/vlsergey/react-bootstrap-pagination/master/doc-images/8of15std.png)

```jsx
<Pagination aroundCurrent={3} showFirstLast={false} showPrevNext={false} atBeginEnd={0} value={7} totalPages={15} />
```

![](https://raw.githubusercontent.com/vlsergey/react-bootstrap-pagination/master/doc-images/8of15noFLs.png)

```jsx
<Pagination showFirstLast={false} showPrevNext={false} value={1} totalPages={3} disabled size="sm" />
```
![](https://raw.githubusercontent.com/vlsergey/react-bootstrap-pagination/master/doc-images/2of3readOnly.png)

# Changelog
Undescribed minor versions are for dependencies updates.

## 3.2.1
* 🐛 Make `firstPageValue` optional

## 3.2.0
* 🎨 Allow to change first page value with `firstPageValue` attribute

## 3.1.0
* 🎨 Export `PropsType` and `OnChangeEventType` interfaces

## 3.0.2
* 🐛 Add missing `key` attribute to PaginationItemWrapper in PaginationWrapper

## 3.0.1
* 🐛 Fixed incorrect implementation of page item click handler

## 3.0.0
* ✨ Allow `totalPages` to be `undefined`
* 🔨 Change from class component to function
* 🔨 Add `strict` option to TypeScript's `compilerOptions`
* ⬆️ Migrate to js-config 8.1 with new eslint rules
* 👷 Migrate from TravisCI to GitHub Actions

## 2.2.4
* 🐛 Fixed infinite cycle when `Infinity` (`Number.POSITIVE_INFINITY`) passed as value of `totalPages`

## 2.2.3
* 📦 Set target for both CommonJS & ESM to ES5, since WebPack 5 picks ESM and forgot to transpile it with tsc.

## 2.2.2
* 📦 Set target for CommonJS to ES5

## 2.2.1
* 🐛 Make optional props optional from TypeScript point of view.

## 2.2.0
* 📦 Set target for ESM to ES2020
* 🛠 Add properties from bootstrap [Pagination](https://react-bootstrap.github.io/components/pagination/) to wrapper props (to allow passed down props like `style`)
* 🛠 Update dependencies

## 2.1.0
* 📦 Add hybrid CommonJS + ESM packaging.

## 2.0.0
* ⚡ Move from [flow](https://flow.org/) to [TypeScript](https://www.typescriptlang.org/).

## 1.0.1
* 🐛 Fix main file link in `package.json`

## 1.0.0
* 🎉 Initial version

[npm-image]: https://img.shields.io/npm/v/@vlsergey/react-bootstrap-pagination.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@vlsergey/react-bootstrap-pagination
[travis-image]: https://travis-ci.com/vlsergey/react-bootstrap-pagination.svg?branch=master
[travis-url]: https://travis-ci.com/vlsergey/react-bootstrap-pagination
[downloads-image]: http://img.shields.io/npm/dm/@vlsergey/react-bootstrap-pagination.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/@vlsergey/react-bootstrap-pagination
