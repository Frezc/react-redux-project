/**
 * Created by Frezc on 2016/10/12.
 */
import React, { PureComponent, PropTypes } from 'react';

import './style.scss';

class AppHeader extends PureComponent {

  static propTypes = {
    avatar: PropTypes.string,
    nickname: PropTypes.any.isRequired
  }

  static defaultProps = {
    avatar: require('../../assets/avatar.jpg')
  }

  render() {
    const { avatar, nickname } = this.props;

    return (
      <div className="app-header">
        <div className="title">淘兼职后台管理</div>
        <div className="abstract-profile">
          <img src={avatar} alt="头像"/>
          <span>{nickname}</span>
        </div>
      </div>
    )
  }
}

export default AppHeader