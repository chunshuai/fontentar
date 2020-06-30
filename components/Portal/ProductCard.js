import { PureComponent } from 'react';
import { Carousel, Card, Tabs, Row, Col, Icon, Menu, Spin } from 'antd';

export default class ProductCard extends PureComponent{

  render() {
    let topColResponsiveProps = this.props.topColResponsiveProps;
    let alt = this.props.alt;
    let src = this.props.src;
    let title = this.props.title;
    let description = this.props.description;
    let price = this.props.price;
    
    console.log("topColResponsiveProps");
    console.log(topColResponsiveProps);
    if(typeof (topColResponsiveProps) == "undefined" || topColResponsiveProps == null) {
      topColResponsiveProps = {
        xs: 24,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 6,
        style: { marginBottom: 24 },
      };
    }

    return (
      <Col {...topColResponsiveProps}>
        <Card
          hoverable
          style={{ margin: '0 10px' }}
          cover={<img alt={alt} src={src} />}
        >
          <Card.Meta
            title={title}
            description={description}
          />
          {/* <div style={{ border: 'thin solid black' }} > */}
          <div>
            <div style={{
              // border: 'thin solid black',
              float: 'right',
              position: 'relative',
              bottom: '-10px',
            }}
            >起</div>
            <div style={{
              // border: 'thin solid black',
              float: 'right',
              bottom: '0',
              fontSize: '150%',
            }}
            >￥{price}</div>
          </div>
          {}
        </Card>
      </Col>
    );
  }
}
