import React from 'react'
import { Input, Button } from 'reactstrap'
import { newsCategory } from '../news'



class Hader extends React.Component {
    state = {
        searchValue: ''
    }

    searchRef = React.createRef()

    componentDidMount() {
      this.searchRef.current.focus();
    }

    handelChange = e => {
        this.setState({
            searchValue: e.target.value
        })
    }

    handelKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.props.searchHandel(this.state.searchValue)
        }
    }

    render() {
       
        const { category, changeCategory } = this.props
        return (
            <div className='my-4' >
                <h1 className='mb-4' style={{ fontWeight: '300' }} >
                    Block Bluster Haedlines
                </h1>
                <Input
                    ref={this.searchRef}
                    type='search'
                    placeholder='type anything && press enter for result'
                    value={this.state.searchValue}
                    onChange={this.handelChange}
                    onKeyPress={this.handelKeyPress}
                />
                <div className='my-4'>
                    {newsCategory && Object.keys(newsCategory).map(item => {
                        if (category === newsCategory[item]) {
                            return (
                                <Button onClick={() => changeCategory(newsCategory[item])} className='btn-sm mx-2' color='warning' >
                                    {`#${newsCategory[item]}`}
                                </Button>
                            );
                        }
                        return (
                            <Button onClick={() => changeCategory(newsCategory[item])} className='btn-sm mx-2 my-2' color='primary'>
                                {`#${newsCategory[item]}`}
                            </Button>
                        );
                    })}

                </div>
            </div>
        );
    }
}

export default Hader;