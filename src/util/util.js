export default function IterationMenuTree(menuData, asideMenu) {
    var item = {}
    menuData.forEach(function (v, i) {
        if (v.children) {
            var children = []
            item.name = v.name
            item.url = v.url
            item.icon = v.icon
            item.label = v.name
            IterationMenuTree(v.children, children)
            item.children = children
            asideMenu.push(item)
        } else {
            item.name = v.name
            item.url = v.url
            item.label = v.name
            item.icon = v.icon
            asideMenu.push(item)
        }
    })
}