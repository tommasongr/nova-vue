export class InformationView {
    constructor() {
        this._treeView = new TreeView('tommasonegri.vue.sidebar.info', {
            dataProvider: this,
        })

        this._statusElement = {
            title: 'Status',
            value: 'Inactive',
            identifier: 'status',
        }

        this.getChildren = this.getChildren.bind(this)
        this.getTreeItem = this.getTreeItem.bind(this)
    }

    set status(value) {
        this._statusElement.value = value
        this._treeView.reload(this._statusElement)
    }

    reload() {
        this._treeView.reload()
    }

    getChildren(element) {
        if (element == null) {
            return [this._statusElement]
        }
        return []
    }

    getTreeItem(element) {
        const item = new TreeItem(element.title, TreeItemCollapsibleState.None)
        item.descriptiveText = element.value
        item.identifier = element.identifier
        return item
    }

    dispose() {
        this.status = 'Disposed'
        this._treeView.dispose()
    }
}
