var links = [
    {
        href: "/", value: "Home"
    },
    {
        href: "/platform", value: "Platform",
    },
    {
        href: "/request", value: "Request Demo",
    },
    {
        href: "/blog", value: "Blog",
    }
];


function set(active){
    "use strict";
    var _ = [].concat(links);
    _ = _.map((v,q)=>{
        if(v){
            if (v.value === active){
                v['active'] = true;
            }
        }
        return v
    });
    return _
}

module.exports = set;