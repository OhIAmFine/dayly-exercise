// ---------- 一些排序算法
// js 利用sort进行排序
systemSort: function(array) {
    return array.sort(function(a, b) {
        return a - b;
    });
},
// 冒泡排序
bubbleSort: function(array) {
    var i = 0,
    len = array.length,
    j, d;
    for (; i < len; i++) {
        for (j = 0; j < len; j++) {
            if (array[i] < array[j]) {
                d = array[j];
                array[j] = array[i];
                array[i] = d;
            }
        }
    }
    return array;
},
// 快速排序
quickSort: function(array) {
    //var array = [8,4,6,2,7,9,3,5,74,5];
    //var array = [0,1,2,44,4,324,5,65,6,6,34,4,5,6,2,43,5,6,62,43,5,1,4,51,56,76,7,7,2,1,45,4,6,7];
    var i = 0;
    var j = array.length - 1;
    var Sort = function(i, j) {

        // 结束条件
        if (i == j) {
            return
        };

        var key = array[i];
        var stepi = i; // 记录开始位置
        var stepj = j; // 记录结束位置
        while (j > i) {
            // j <<-------------- 向前查找
            if (array[j] >= key) {
                j--;
            } else {
                array[i] = array[j]
                //i++ ------------>>向后查找
                while (j > ++i) {
                    if (array[i] > key) {
                        array[j] = array[i];
                        break;
                    }
                }
            }
        }

        // 如果第一个取出的 key 是最小的数
        if (stepi == i) {
            Sort(++i, stepj);
            return;
        }

        // 最后一个空位留给 key
        array[i] = key;

        // 递归
        Sort(stepi, i);
        Sort(j, stepj);
    }

    Sort(i, j);

    return array;
},

// 插入排序
insertSort: function(array) {

    // http://baike.baidu.com/image/d57e99942da24e5dd21b7080
    // http://baike.baidu.com/view/396887.htm
    //var array = [0,1,2,44,4,324,5,65,6,6,34,4,5,6,2,43,5,6,62,43,5,1,4,51,56,76,7,7,2,1,45,4,6,7];
    var i = 1,
    j, step, key, len = array.length;

    for (; i < len; i++) {

        step = j = i;
        key = array[j];

        while (--j > -1) {
            if (array[j] > key) {
                array[j + 1] = array[j];
            } else {
                break;
            }
        }

        array[j + 1] = key;
    }

    return array;
},

// 希尔排序
//Jun.array.shellSort(Jun.array.df(10000));
shellSort: function(array) {

    // http://zh.wikipedia.org/zh/%E5%B8%8C%E5%B0%94%E6%8E%92%E5%BA%8F
    // var array = [13,14,94,33,82,25,59,94,65,23,45,27,73,25,39,10];
    var stepArr = [1750, 701, 301, 132, 57, 23, 10, 4, 1]; // reverse() 在维基上看到这个最优的步长 较小数组
    //var stepArr = [1031612713, 217378076, 45806244, 9651787, 2034035, 428481, 90358, 19001, 4025, 836, 182, 34, 9, 1]//针对大数组的步长选择
    var i = 0;
    var stepArrLength = stepArr.length;
    var len = array.length;
    var len2 = parseInt(len / 2);

    for (; i < stepArrLength; i++) {
        if (stepArr[i] > len2) {
            continue;
        }

        stepSort(stepArr[i]);
    }

    // 排序一个步长
    function stepSort(step) {

        //console.log(step) 使用的步长统计
        var i = 0,
        j = 0,
        f, tem, key;
        var stepLen = len % step > 0 ? parseInt(len / step) + 1 : len / step;

        for (; i < step; i++) { // 依次循环列
            for (j = 1;
            /*j < stepLen && */
            step * j + i < len; j++) { //依次循环每列的每行
                tem = f = step * j + i;
                key = array[f];

                while ((tem -= step) >= 0) { // 依次向上查找
                    if (array[tem] > key) {
                        array[tem + step] = array[tem];
                    } else {
                        break;
                    }
                }

                array[tem + step] = key;

            }
        }

    }

    return array;

}


1.冒泡排序

var bubbleSort = function (arr) {
  var flag = true;
  var len = arr.length;
  for (var i = 0; i < len - 1; i++) {
    flag = true;
    for (var j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j+1];
        arr[j+1] = arr[j];
        arr[j] = temp;
        flag = false;
      }
    }
    if (flag) {
      break;
    }
  }
};
2.选择排序

var selectSort = function (arr) {a
  var min;
  for (var i = 0; i < arr.length-1; i++) {
    min = i;
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[min] > arr[j]) {
        min = j;
      }
    }
    if (i != min) {
      swap(arr, i, min);
    }
     console.log(i+1, ": " + arr);
  }
};
function swap(arr, index1, index2) {
  var temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
};
3.插入排序

var insertSort = function (arr) {
  var len = arr.length, key;
  for (var i = 1; i < len; i++) {
    var j = i;
    key = arr[j];
    while (--j > -1) {
      if (arr[j] > key) {
        arr[j + 1] = arr[j];
      } else {
        break;
      }
    }
    arr[j + 1] = key;
  }
};
4.希尔排序

var shellSort = function (arr) {
  var gaps = [5, 3, 1];
  for (var g = 0; g < gaps.length; ++g) {
    for (var i = gaps[g]; i < arr.length; ++i) {
      var temp = arr[i];
      for (var j = i; j >= gaps[g] && arr[j - gaps[g]] > temp; j -= gaps[g]) {
        arr[j] = arr[j - gaps[g]];
      }
      arr[j] = temp;
    }
  }
};
5.归并排序

function mergeSort(arr) {
  if (arr.length < 2) {
    return;
  }
  var step = 1;
  var left, right;
  while (step < arr.length) {
    left = 0;
    right = step;
    while (right + step <= arr.length) {
      mergeArrays(arr, left, left + step, right, right + step);
      left = right + step;
      right = left + step;
    }
    if (right < arr.length) {
      mergeArrays(arr, left, left + step, right, arr.length);
    }
    step *= 2;
  }
}
function mergeArrays(arr, startLeft, stopLeft, startRight, stopRight) {
  var rightArr = new Array(stopRight - startRight + 1);
  var leftArr = new Array(stopLeft - startLeft + 1);
  k = startRight;
  for (var i = 0; i < (rightArr.length - 1); ++i) {
    rightArr[i] = arr[k];
    ++k;
  }
  k = startLeft;
  for (var i = 0; i < (leftArr.length - 1); ++i) {
    leftArr[i] = arr[k];
    ++k;
  }
  rightArr[rightArr.length - 1] = Infinity; // 哨兵值
  leftArr[leftArr.length - 1] = Infinity; // 哨兵值
  var m = 0;
  var n = 0;
  for (var k = startLeft; k < stopRight; ++k) {
    if (leftArr[m] <= rightArr[n]) {
      arr[k] = leftArr[m];
      m++;
    }
    else {
      arr[k] = rightArr[n];
      n++;
    }
  }
}
6.快速排序

var quickSort = function(arr, left, right) {
  var i, j, t, pivot;
  if (left >= right) {
    return;
  }
  pivot = arr[left];
  i = left;
  j = right;
  while (i != j) {
    while (arr[j] >= pivot && i < j) {
      j--;
    }
    while (arr[i] <= pivot && i < j) {
      i++;
    }
    if (i < j) {
      t = arr[i];
      arr[i] = arr[j];
      arr[j] = t;
    }
  }
  arr[left] = arr[j];
  arr[j] = pivot;
  quickSort(arr, left, i - 1);
  quickSort(arr, i + 1, right);
}