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

    reload() {
        this._treeView.reload()
    }

    getChildren(element) {
        if (element == null) {
            return [this._statusElement, this._vlsVersionElement]
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
        this.status = 'Disposed'
        this._treeView.dispose()
    }
}
