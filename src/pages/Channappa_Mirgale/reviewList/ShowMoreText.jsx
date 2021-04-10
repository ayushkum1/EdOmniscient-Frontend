import ShowMoreText from 'react-show-more-text';


class ShowMoreText extends Component {

    executeOnClick(isExpanded) {
        console.log(isExpanded);
    }

    render() {
        return (
            <ShowMoreText
                /* Default options */
                lines={3}
                more='Show more'
                less='Show less'
                className='content-css'
                anchorClass='my-anchor-css-class'
                onClick={this.executeOnClick}
                expanded={false}
                width={280}
            >
            </ShowMoreText>
        );
    }
}