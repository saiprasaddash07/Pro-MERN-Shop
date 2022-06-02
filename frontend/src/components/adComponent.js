import React from 'react';

export default class AdComponent extends React.Component {
    componentDidMount() {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }

    render() {
        return (
            <ins className='adsbygoogle'
                style={{ display: 'block' }}
                data-ad-client="ca-pub-4529144593315707"
                data-ad-slot="4675368681"
                data-ad-format='auto' />
        );
    }
}