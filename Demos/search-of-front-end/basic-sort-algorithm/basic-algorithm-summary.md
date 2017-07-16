---
title: 前端基础算法总结（JavaScript版）
tags:
  - algorithm
id: 2017751
categories:
  - algorithm
date: 2017-07-05 11:15:15
---
本文将总结简单选择排序、冒泡排序、插入排序、希尔排序、快速排序及二分搜索等基础算法的JavaScript版写法，欢迎一起研讨！

<!--more-->

## 排序算法：

### 简单选择排序：

``` JavaScript
function selectionSort(arr) {
     let i, j, len = arr.length, temp = 0,minIndex
     for (i=0;i<len-1;i++) {
         minIndex = i
         for (j=i+1;j<len ;j++) {
             if (arr[j]<arr[minIndex]) {
                 minIndex = j
             }
         }
         //第 i 个元素与最小元素交换
         temp = arr[i]
         arr[i] = arr[minIndex]
         arr[minIndex] = temp
     }
     return arr
 }
```

### 冒泡排序：
``` JavaScript
function bubbleSort(arr) {
    let i,j,len = arr.length,flag,temp
    for (i=len-1;i>=0;i--) {
        flag = 0    //标记本轮循环中是否发生交换，若没有，则说明序列有序，不需要排序。
        for (j=0;j<i;j++) {
            if (arr[j]>arr[j+1]) {
                temp = arr[j]
                arr[j]=arr[j+1]
                arr[j+1]=temp
                flag = 1
            }
        }
        if ( !flag ) break  //没有发生交换，说明序列有序，不需要再排序。
    }
    return arr
}
```

### 插入排序：
``` JavaScript
func insertionSort(arr) {
    let i, j, len=arr.length, target
    for (i=1;i<len-1;i++) {
        target = arr[i]
        for (j=i;j>0&&(arr[j-1]>target);j--) {
            //如果选择的这个元素 target比较小，需要插入到前面的位置：
            arr[j] = arr[j-1]   //较大的元素向右移，给 target 留出空位。
        }
        arr[j] = target //插入 target 到合适的位置
    }
    return arr
}
```

### 希尔排序：
``` JavaScript
function shellSort(arr) {
    let i, j, k, len = arr.length, target
    increment = [15,7,3,1]  //选定增量序列
    for (i=0;i<increment.length;i++) {
        let incre = increment[i]
        for (j=incre;j<len;j++) {
            target = arr [j]
            for (k=j;k-incre>0&&arr[k]>target;k-=incre) {
                arr[k] = arr[k-incre]
            }
            arr[k] = target
        }
    }
    return arr
}
```

### 快速排序：
JavaScript实现快排有一个投机取巧的办法，就是直接利用Array.prototype.sort()在浏览器环境、node环境等具体实现中内部进行了优化的特性，
直接用这个方法简单的实现高效率的快速排序！

``` JavaScript
    arr.sort((a,b)=>{
        return a-b
    })
    //这个算法的时间复杂度也非常低！比大多数手写的快排都要快！
```

### 二分搜索：
``` JavaScript
function binarySearch(arr, key) {
    let len = arr.length, left = 0, right =len -1,
        ret = -1,mid
    while (right >= left ) {
        mid = parseInt((left+right)/2)
        if (arr[mid]===key) {
            ret = mid
            break
        } else if (arr[mid]<key) {
            left = mid+1
        } else {
            right = mid -1
        }
    }
    return mid
}
```


待续...