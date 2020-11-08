let Available = [3,3,2], //当前可用资源
Max = [
    [7,5,3],
    [3,2,2],
    [9,0,2],
    [2,2,2],
    [4,3,3]
],//各进程对A B C 类资源的最大需求量
Allocation = [
    [0,1,0],
    [2,0,0],
    [3,0,2],
    [2,1,1],
    [0,0,2]
],//各进程现已分配的A B C 类资源数量
Need = [
    [7,4,3],
    [1,2,2],
    [6,0,0],
    [0,1,1],
    [4,3,1]
]//各进程仍需要的A B C 类资源数量
let btn = document.querySelector('.btn')
let select = document.querySelector('#process')

btn.onclick = () => {
    let index = select.selectedIndex - 1
    let box1 = resource.box1.value - 0
    let box2 = resource.box2.value - 0
    let box3 = resource.box3.value - 0
    let request = []
    request.push(box1)
    request.push(box2)
    request.push(box3)
    main(request, index)
}

//比较函数
function compare(a, b ,m) {
    for (let i = 0; i < m; i++) {
        if (a[i] <= b[i]) {
            continue
        } else {
            return false
        }
    }
    return true
}

//判断是否全为true
function allTrue(finish) {
    for (let i = 0; i < finish.length; i++) {
        if (finish[i]) {
            continue
        } else {
            return false
        }
    }
    return true
}

//银行家算法
function main (request, index) {
    //先让请求数量和剩余需求数量做对比
    if(compare(request, Need[index], request.length)) {
        //再让请求数量和当前可用资源数量做对比
        if(compare(request, Available, request.length)) {
            //假定可以成功分配
            for (let i = 0; i < Available.length; i++) {
                Available[i] -= request[i]
            }
            for (let i = 0; i < Available.length; i++) {
                Allocation[index][i] += request[i]
            }
            for (let i = 0; i < Available.length; i++) {
                Need[index][i] -= request[i]
            }

            let Work = []
            for (let i = 0; i < Available.length; i++) {
                Work[i] = Available[i]
            }

            let Finish = []
            for (let i = 0; i < Allocation.length; i++) {
                Finish.push(false)
            }

            let safe_arr = []

            checkSafe()

            function checkSafe () {
                for (let i = 0; i < Allocation.length; i++) {
                    if (Finish[i] === false) {
                        if (compare(Need[i], Work, Available.length)) {
                            for (let j = 0; j < Available.length; j++) {
                                Work[j] += Allocation[i][j]
                            }
                           //如果该进程能完成，则置finish为true                                    
                            Finish[i] = true
                            safe_arr.push(i)//加进安全序列
                            checkSafe()
                        } else {
                            continue
                        }
                    } else {
                        continue
                    }
                }
            }

            if (allTrue(Finish)) {
                alert('当前请求安全，' + '安全序列为：' + safe_arr)
            } else {
                for (let i = 0; i < Available.length; i++) {
                    Available[i] += request[i]
                }
                for (let i = 0; i < Available.length; i++) {
                    Allocation[index][i] -= request[i]
                }
                for (let i = 0; i < Available.length; i++) {
                    Need[index][i] += request[i]
                }
                for (let i = 0; i < Available.length; i++) {
                    Work[i] = Available[i]
                }
                alert('当前请求不安全，系统不予分配资源。')
            }
        } else {
            alert('当前可用资源不足。')
            return false
        }
    } else {
        alert('请求资源超过进程的最大需求量。')
        return false
    }
}

