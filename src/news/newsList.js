import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Button
} from 'reactstrap'

function getDateStr({ dateTimeStr }) {
    return new Date(dateTimeStr).toDateString()
}

const NewsItem = ({ item }) => (
    <div>
        <Card className='my-4'>
            <CardImg top width="100%" src={item.urlToImage} alt={item.title} />
            <CardBody>
                <a style={{color:'black'}} href={item.url} target="_blank" rel="noopener noreferrer">
                    <CardTitle>{item.title}</CardTitle>
                </a>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <CardText>{item.content}</CardText>
                </a>
                <CardText className='d-flex align-items-center' >
                    <small className="text-muted">Published At {getDateStr(item.publishedAt)}</small>
                    <Button className='ml-auto' color="secondary">{item.source.name}</Button>
                </CardText>
                <CardText>
                    
                </CardText>

            </CardBody>
        </Card>
    </div>
)

function NewsList({ news }) {
    return (
        <div>
            {news && news.length === 0 && <h4>There is no news</h4>}
            {news && news.map(item => <NewsItem key={item.title} item={item} />)}
        </div>
    )
}

export default NewsList
