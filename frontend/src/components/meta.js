import React from 'react';
import {Helmet} from 'react-helmet';

const MetaComponent = ({title,description,keywords}) => {
    return (
        <div>
            <Helmet>
                <title>{title}</title>
                <meta
                    name="description"
                    content={description} />
                <meta
                    name="keyword"
                    content={keywords} />
            </Helmet>
        </div>
    );
};

MetaComponent.defaultProps = {
    title : 'Welcome to pro-mern-shop',
    description : 'We sell the best products for cheap',
    keywords : 'electronics,buy electronics,cheap electronics'
}

export default MetaComponent;
