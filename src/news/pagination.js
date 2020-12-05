import React, { Component } from 'react';
import { Button, Input } from 'reactstrap'

class Pagination extends Component {
    state = {
        isSelect: false
    }
    render() {

        const {
            next,
            prev,
            isNext,
            isPrev,
            totalPage,
            currentPage,
            handelPageChange,
            goToPage
        } = this.props
        return (
            <div className='d-flex my-5'>
                <Button color='warning'
                    disabled={!isPrev}
                    onClick={() => prev()}
                >Previous</Button>
                <div className='flex-grow-1 text-center mx-1'>
                    {this.state.isSelect ? (
                        <Input
                            type='number'
                            value={currentPage}
                            onChange={e => handelPageChange(e.target.value)}
                            onKeyPress={e=>{
                                if(e.key==='Enter'){
                                    goToPage()
                                    handelPageChange(e.target.value)
                                    this.setState({isSelect:false})
                                }
                            }}
                        />
                    ) : (
                            <p
                                style={{ userSelect: 'none', lineHeight: '1.1' }}
                                title='Double tap to jamp page'
                                onDoubleClick={() => {
                                    this.setState({ isSelect: !this.state.isSelect })
                                }}
                            >
                                {currentPage} of {totalPage}
                                <br />
                                <small>Double tap to Edit</small>

                            </p>
                        )}
                </div>
                <Button
                    className='ml-auto'
                    color='warning'
                    disabled={!isNext}
                    onClick={() => next()}
                >Next</Button>
            </div>
        );
    }
}

export default Pagination;
