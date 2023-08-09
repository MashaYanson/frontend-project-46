const descriptionMap = {
  deleted: ' was removed ',
  added: ' was added with value:  ',
  updated: '  was updated. ',

};

const getDescription = (status) => {
  return descriptionMap[status]
}

//найти родителей каждого ключа
const plain = (tree) => {
  let result = '';
  tree.forEach((node) => {
    // result += `Property ${node.key} ${getDescription(node.status)}  `
    switch (node.status) {
      case 'deleted':
        result += `Property ${node.key} ${getDescription(node.status)}\n`;
        break
      case 'added':
        result += `Property ${node.key} ${getDescription(node.status)}\n`;
        break
      case 'updated':
        result += `Property ${node.key} ${getDescription(node.status)} From ${}\n`
    }
  }
}
export default plain();