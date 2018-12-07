function format(time) {
    return time < 10 ? '0' + time : time; 
}

module.exports = {
    timedata: function(timestamp) {
        var sDate = new Date();
        // 转换成前台的时间戳。后天的时间戳截止到秒，前台的时间戳截止到毫秒。
        sDate.setTime(timestamp * 1000);
        // console.log(sDate);
        var formatDate = sDate.getFullYear() +
                        '-' + format(sDate.getMonth() + 1) +
                        '-' + format(sDate.getDate()) + 
                        ' ' + format(sDate.getHours()) + 
                        ':' + format(sDate.getMinutes()) + 
                        ':' + format(sDate.getSeconds());
        // console.log(formatDate);
        return formatDate;
    }
}