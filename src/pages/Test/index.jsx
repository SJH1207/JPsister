import React, { Component } from 'react';

export default class index extends Component {
  state = {
    dataList: [
      { id: 1, age: 111 },
      { id: 2, age: 222 },
      { id: 3, age: 333 },
      { id: 4, age: 444 },
    ],
  };

  up = (item, index) => {
    const { dataList } = this.state;
    if (index !== 0) {
      console.log(index);
      const arr = dataList;
      const arrup = dataList[index - 1];
      arr[index - 1] = arr[index];
      arr[index] = arrup;
      console.log(arr);
      this.setState({
        dataListL: arr,
      });
    } else {
      alert('您是第一个了');
    }
  };
  down = (iten, index) => {
    const { dataList } = this.state;
    if (index !== dataList.length - 1) {
      console.log(index);
      const arr = dataList;
      const arrdown = dataList[index + 1];
      arr[index + 1] = arr[index];
      arr[index] = arrdown;
      console.log(arr);
      this.setState({
        dataListL: arr,
      });
    } else {
      alert('您是最后一个了');
    }
  };
  render() {
    const { dataList } = this.state;
    return (
      <div>
        {dataList.map((item, index) => {
          return (
            <div key={item.id}>
              {item.age}
              <a onClick={() => this.up(item, index)}>上移</a>
              <a onClick={() => this.down(item, index)}>下移</a>
            </div>
          );
        })}
      </div>
    );
  }
}
