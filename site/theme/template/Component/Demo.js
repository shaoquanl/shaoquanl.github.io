import React from 'react'
import ReactDOM from 'react-dom';
import classNames from 'classnames';

export default class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      codeExpand: false,
    };
  }

  handleCodeExapnd () {
    this.setState({ codeExpand: !this.state.codeExpand });
  }

  render() {
    const props = this.props;
    const {
      meta,
      src,
      content,
      preview,
      title,
      highlightedCode,
      style,
      highlightedStyle,
    } = props;
    const introChildren = props.utils.toReactComponent(['div'].concat(content));
    const codeExpand = this.state.codeExpand;
    const highlightClass = classNames({
      'highlight-wrapper': true,
      'highlight-wrapper-expand': codeExpand,
    });
    const codeBoxClass = classNames({
      'code-box': true,
      expand: codeExpand,
      'layout-demo': true
    });

    return (
      <div>
        <section className={codeBoxClass}>
          <section className="code-box-demo">
            {
              meta.iframe ?
                <iframe src={src} /> :
                preview(React, ReactDOM)
            }
            {
              !!style ?
                <style dangerouslySetInnerHTML={{ __html: style }} /> :
                null
            }
          </section>
          <section className="code-box-meta markdown">
            <div className="code-box-title">
              <a href={`#${meta.id}`}>{meta.title}</a>
            </div>
            <div className="code-box-content">{introChildren}</div>
            <span className="anticon-circle-o-right"
              onClick={this.handleCodeExapnd.bind(this)}
              unselectable="none"
            />
          </section>
          <section className={highlightClass}>
            <div className="highlight">
              {props.utils.toReactComponent(highlightedCode) }
            </div>
          </section>
        </section>
      </div>
    )
  }
}
