Js-sdsl 为所有可迭代容器重载了 `[Symbol.iterator]` 函数，用于 `for...of` 语法

除此之外，我们为顺序容器和树容器提供了类似 C++ STL 的双向迭代器

## Symbol.iterator

[MDN 上关于迭代器的解释](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator)

以 Vector 为例

```typescript
const v = new Vector([1, 2, 3]);
for (const u of v) {
    console.log(u);     // 1, 2, 3
}
```

## 独有的双向迭代器

和 C++ 一样，我们提供正向 (normal) / 反向 (reverse) 两种迭代器模式，同时为支持迭代器的容器提供了 `begin`，`end`，`rBegin`，`rEnd` 四个函数

由于 Js 中没有指针相关的概念，Js-sdsl 通过在迭代器上添加 `pointer` 属性来模拟 `*` 运算，添加 `next` 和 `pre` 函数来模拟 `++` 和 `--` 操作

**注意，pre 和 next 会改变该对象内原有的指针位置，就像 C++ 中 `++it` 一样，it 本身也会被改变**

```typescript
import type { IteratorType } from 'js-sdsl';

const v = new Vector([1, 2, 3]);
let it = v.begin();
console.log(it.pointer);        // 1
console.log(
    it.iteratorType ===
    IteratorType.NORMAL
);                              // true
it = it.next();
console.log(it.pointer);        // 2
it = it.pre();
console.log(it.pointer);        // 1

for (
    let i = v.begin();
    !i.equals(v.end());
    i = i.next()
) {
    console.log(i.pointer);     // 1, 2, 3
}

it = v.rBegin();
console.log(it.pointer);        // 3
console.log(
    it.iteratorType ===
    VectorIterator.REVERSE
);                              // true
it = it.next();
console.log(it.pointer);        // 2
it = it.pre();
console.log(it.pointer);        // 3
```

**注意，和 C++ 一样，如果你删除了迭代器所指向的元素，那么迭代器会失效，这是一个危险的操作**

## Try it

<p>
<textarea id="input">
const v = new Vector([1, 2, 3]);
let it = v.begin();
const itCopy = it.copy();
it = it.next();
console.log(it.pointer);        // 2
console.log(itCopy.pointer);    // 1
</textarea>
</p>

<div id="output"></div>

<button id="run">Run it</button>
<button id="reset">Reset</button>
