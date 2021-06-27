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

        this._vlsVersionElement = {
            title: 'VLS Version',
            value: 'Retrieving...',
            identifier: 'vlsversion',
            tooltip:
                'VLS stands for Vue Language Server. VLS is the backbone of the Vetur suite.',
        }

        this._vueVersionElement = {
            title: 'Vue Version',
            value: 'Retrieving...',
            identifier: 'vueversion',
        }

        this.getChildren = this.getChildren.bind(this)
        this.getTreeItem = this.getTreeItem.bind(this)
    }

    set status(value) {
        this._statusElement.value = value
        this._treeView.reload(this._statusElement)
    }
    set vlsVersion(value) {
        this._vlsVersionElement.value = value
        this._treeView.reload(this._vlsVersionElement)
    }
    set vueVersion(value) {
        this._vueVersionElement.value = value
        this._treeView.reload(this._vueVersionElement)
    }

    reload() {
        this._treeView.reload()
    }

    getChildren(element) {
        if (element == null) {
            return [
                this._statusElement,
                this._vlsVersionElement,
                this._vueVersionElement,
            ]
        }
        return []
    }

    getTreeItem(element) {
        const item = new TreeItem(element.title, TreeItemCollapsibleState.None)
        item.descriptiveText = element.value
        item.identifier = element.identifier
        item.tooltip = element.tooltip
        return item
    }

    dispose() {
        this.status = 'Stopped'
        this._treeView.dispose()
    }
}
