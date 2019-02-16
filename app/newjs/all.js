var $ = {
    createXHR: function () {
        if (typeof XMLHttpRequest != "undefined") {
            return new XMLHttpRequest()
        } else if (typeof ActiveXObject != "undefined") {
            if (typeof arguments.callee.activeXString != "string") {
                var versions = ["MSXML2 XMLHttp.6.0", "MSXML2 XMLHttp.3.0", "MSXML2 XMLHttp"]
                for (var i = 0; i < versions.length; i++) {
                    try {
                        new ActiveXObject(versions[1])
                        arguments.callee.activeXString = versions[i]
                        break
                    } catch (ex) {}
                }
            }
            return new ActiveXObject(arguments.callee.activeXString)
        } else {
            throw new Error("No XHR object available.")
        }
    },
    format: function (data) {
        var str = ''
        for (var key in data) {
            str += key + "=" + data[key] + "&"
        }
        return str.slice(0, -1)
    },
    ajax: function (options) {
        var defaule = {
            type: "get",
            async: true,
            data: "",
        };
        var ops = Object.assign({}, defaule, options);
        var xhr = this.createXHR();
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status <= 300 || xhr.status == "304") {
                ops.success(xhr.response)
            } else {
                ops.error(new Error("Can not find Url" + ops.url))
            }
        };
        var data = typeof ops.data === "object" ? this.format(ops.data) : ops.data;
        var url = ops.type == "get" && data != "" ? ops.url + "?" + data : ops.url;
        xhr.open(ops.type, url, ops.async)
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
        xhr.send(ops.type == "get" ? null : data)
    }
}
window.onload = function () {
    console.log("1")
    console.log("2222")
}