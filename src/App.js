import React from 'react';
import { BsChevronDoubleUp } from "react-icons/bs";
import { Container, Row } from 'reactstrap'
import Hader from './component/hader'
import News, { newsCategory } from './news'
import NewsList from './news/newsList'
import Pagination from './news/pagination'
import Loading from './component/loading'

// const fackNews = [
//   {
//     title: 'title',
//     content: 'content',
//     url: 'https://linktonews.com',
//     urlToImage: 'https://linktoimage.com',
//     publishedAt: 'Date and Time',
//     source: {
//       name: 'CNN'
//     }
//   },
//   {
//     title: 'title1',
//     content: 'content',
//     url: 'https://linktonews.com',
//     urlToImage: 'https://linktoimage.com',
//     publishedAt: 'Date and Time',
//     source: {
//       name: 'CNN'
//     }
//   }
// ]

// const URL = 'https://jsonplaceholder.typicode.com/users'

// axios.get(URL)
//   .then(res => {
//     console.log(res.data);
//   })


const news = new News(newsCategory.technology)

class App extends React.Component {

  state = {
    // news: [],
    // category: newsCategory.technology

    data: {},
    isLoding: true
  }


  aboutRef= React.createRef()

  



  componentDidMount() {
    // const URL = `${process.env.REACT_APP_NEWS_URL}?apiKey=${process.env.REACT_APP_NEWS_KEY}&category=${this.state.category}`
    // axios.get(URL)
    //   .then(res => {
    //     this.setState({
    //       news: res.data.articles
    //     })
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })

    // const news = new News(newsCategory.technology);
    // news.getNews()
    //    .then(data=>{
    //   this.setState({news:data.article})
    //   console.log(data)
    // })

    news.getNews()
      .then(data => {
        this.setState({ data, isLoding: false })
      })
      .catch(e => {
        console.log(e);
        alert('Something worng')
        this.setState({ isLoding: false })
      })

      // console.dir(this.aboutRef.current)
  }



  componentDidUpdate(prevProps, prevState) {
    // if (prevState.category!==this.state.category) {
    //   const URL = `${process.env.REACT_APP_NEWS_URL}?apiKey=${process.env.REACT_APP_NEWS_KEY}&category=${this.state.category}&pageSize=10`
    //   axios.get(URL)
    //     .then(res => {
    //       this.setState({
    //         news: res.data.articles
    //       })
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     })
    // }
  }

  next = () => {
    if (this.state.data.isNext) {
      this.setState({ isLoding: true })
    }
    news.next()
      .then(data => {
        this.setState({ data, isLoding: false })
      })
      .catch(e => {
        console.log(e);
        alert('Something worng in next page')
        this.setState({ isLoding: false })
      })
  }


  prev = () => {
    if (this.state.data.isPrev) {
      this.setState({ isLoding: true })
    }
    news.prev()
      .then(data => {
        this.setState({ data, isLoding: false })
      })
      .catch(e => {
        console.log(e);
        alert('Something worng in prev')
        this.setState({ isLoding: false })
      })
  }

  handelPageChange = value => {
    this.setState({
      data: {
        ...this.state.data,
        currentPage: Number.parseInt(value)
      }
    })
  }

  goToPage = () => {
    this.setState({ isLoding: true })
    news.setCurrentPage(this.state.data.currentPage)
        .then(data => {
        this.setState({ data, isLoding: false })
           })
        .catch(e => {
          console.log(e)
          alert('Something worng go to page')
         this.setState({ isLoding: false })
        })
  }

  changeCategory = (category) => {
    this.setState({ isLoding:true })
    news.changeCategory(category)
        .then(data=>{
          this.setState({data,isLoding:false})
        })
        .catch(e=>{
          console.log(e)
          alert('Something worng in  changeCategory func')
         this.setState({ isLoding: false })
        })
  }

  searchHandel=term=>{
    this.setState({ isLoding:true })
    news.search(term)
        .then(data=>{
          console.log(data)
          this.setState({data,isLoding:false})
        })
        .catch(e=>{
          console.log(e)
          alert('Something worng in  search func')
         this.setState({ isLoding: false })
        })
  }

  goToTop=()=>{
    window.scroll(0,this.aboutRef.scrollTop)
  }




  render() {
    const {
      article,
      isNext,
      isPrev,
      totalPage,
      currentPage,
      category,
      totalResults
    } = this.state.data
    return (
      <Container>
        <Row>
          <div className='col-sm-6 offset-md-3' >
            <Hader
              category={category}
              changeCategory={this.changeCategory}
              searchHandel={this.searchHandel}
            />
            <div ref={this.aboutRef} className='d-flex'>
              <p className='text-black-50' >
                About {totalResults} results found
              </p>
              <p className='text-black-50 ml-auto' >
                {currentPage} Page of {totalPage}
              </p>
            </div>
            {this.state.isLoding ? (
              <Loading />
            ) : (
                <div>
                  <NewsList
                    news={article}
                  />
                  <Pagination
                    next={this.next}
                    prev={this.prev}
                    isNext={isNext}
                    isPrev={isPrev}
                    totalPage={totalPage}
                    currentPage={currentPage}
                    handelPageChange={this.handelPageChange}
                    goToPage={this.goToPage}
                  />
                </div>
              )}
          </div>
          <div>
            <a style={{
              position:'fixed',
              right:'20px',
              bottom:'20px',
              fontSize:'40px',
              cursor:'pointer'
              
            }} 
            onClick={this.goToTop}
            > <BsChevronDoubleUp/> </a>
          </div>
        </Row>
      </Container>
    );
  }
}

export default App;
