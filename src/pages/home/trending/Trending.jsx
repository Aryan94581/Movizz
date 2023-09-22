import React from 'react'
import ContentWrapper from '../../../components/contentWrapper/contentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
SwitchTabs  

ContentWrapper

const Trending = () => {

    const onTabChange = (Tab) => {

    }


    return <div className="carouselSection">
        <ContentWrapper>
            <span className="carouselTitle">
                Trending
            </span>
            <SwitchTabs data = {["Day","Week"]}  onTabChange={onTabChange}/>
        </ContentWrapper>
    </div>
}

export default Trending