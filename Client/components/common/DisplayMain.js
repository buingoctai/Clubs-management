import { Menu, Icon } from 'antd';
import 'isomorphic-unfetch'
import Link from 'next/link';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class DisplayMain extends React.Component {
  state = {
    current: 'mail',
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  static async getInitialProps() {
    // eslint-disable-next-line no-undef
    const res = await fetch('http://localhost:8000/clubs/show')
    //const json = await res.json()
    return {res}
  }
  


  render() {
    const PostLink1 = (props) => (
      <li>
        <Link href='/clubManagementRedux'>
          <a>{props.title}</a>
        </Link>
      </li>
    )
    const PostLink2 = (props) => (
      <li>
        <Link href='/scheduleManagement'>
          <a>{props.title}</a>
        </Link>
      </li>
    )
    const PostLink3 = (props) => (
      <li>
        <Link href='/clubManagement'>
          <a>{props.title}</a>
        </Link>
        {/* <Link href='/scheduleManagement'>
          <a>{props.title}</a>
        </Link> */}

      </li>
    )
    return (
      <div>
        <p>{this.props.res}</p>
        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
          <SubMenu
            title={
              <span className="submenu-title-wrapper">
                <Icon type="setting" />
                QUẢN LÝ MÙA GIẢI
            </span>
            }
          >
            <MenuItemGroup title="V-League">
              <Menu.Item key="setting:1"><PostLink1 title="Quản lý đội bóng" /></Menu.Item>
              <Menu.Item key="setting:2"><PostLink2 title="Lịch thi đấu" /></Menu.Item>
              <Menu.Item key="setting:2"><PostLink3 title="Bảng xếp hạng" /></Menu.Item>
            </MenuItemGroup>
          </SubMenu>

        </Menu>
      </div>

    );
  }
}
