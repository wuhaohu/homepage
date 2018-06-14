Mock.mock('/api-dev', 'get', {
    applist: [{
        id: '1',
        name: 'app1',
        date: '2018.03.28',
        type: 'Android',
        desc: 'android project',
    },{
        id: '2',
        name: 'app2',
        date: '2018.03.28',
        type: 'iOS',
        desc: 'iOS project',
    },{
        id: '3',
        name: 'app3',
        date: '2018.03.28',
        type: 'iOS',
        desc: 'iOS project',
    },{
        id: '4',
        name: 'app1',
        date: '2018.03.28',
        type: 'Android',
        desc: 'android project',
    }],
});
var apklist1 = [{
    id: '123',
    name: '这是一个版本',
    version: '1.0.0',
    date: '2018-03-10',
    size: '100KB',
    desc: '第一个版本',
    addr: 'https://www.baidu.com'
},{
    id: '456',
    name: '这是二个版本',
    version: '1.0.1',
    date: '2018-03-11',
    size: '10MB',
    desc: '这个版本很牛的',
    addr: 'http://www.qq.com'
}];
var apklist2 = [{
    id: '789',
    name: '这是一个版本',
    version: '1.0.0',
    date: '2018-03-10',
    size: '100KB',
    desc: '1231231',
    addr: 'http://www.taobao.com'
},{
    id: 'qwe',
    name: '这是二个版本',
    version: '1.0.1',
    date: '2018-03-11',
    size: '10MB',
    desc: '修复了阿伟大的伟大',
    addr: 'http://www.taobao.com'
},{
    id: 'rty',
    name: '这是三个版本',
    version: '1.0.1',
    date: '2018-03-11',
    size: '10MB',
    desc: '则更加哦啊的价位哦',
    addr: 'http://www.taobao.com'
},{
    id: 'uio',
    name: '这是思个版本',
    version: '1.0.1',
    date: '2018-03-11',
    size: '10MB',
    desc: '的期望地获取稳定',
    addr: 'http://www.taobao.com'
}];

Mock.mock('/api-dev/apklist', 'post', function(data) {
    if(JSON.parse(data.body).id == '1'){
        return apklist1;
    } else {
        return apklist2;
    }
});

Mock.mock('/api-dev/apk', 'post', function(data) {
    var arr = apklist1.concat(apklist2);
    for (var index = 0; index < arr.length; index++) {
        if(data.body == arr[index].id) {
            return arr[index];
        }
        
    }
});