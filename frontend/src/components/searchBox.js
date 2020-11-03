import React, {Component} from 'react';
import {Form,Button} from "react-bootstrap";

class SearchBox extends Component {

    state = {
        keyword : ''
    }

    render() {

        const submitHandler = (e) => {
            e.preventDefault();
            if(this.state.keyword.trim()){
                this.props.history.push(`/search/${this.state.keyword}`);
            }else{
                this.props.history.push('/');
            }
        }

        return (
            <Form onSubmit={submitHandler} inline>
                <Form.Control
                    type="text"
                    name="q"
                    onChange={(e) =>
                        {this.setState({keyword:e.target.value})}}
                    placeHolder="Search Products..."
                    className="mr-sm-2 ml-sm-5"
                >
                </Form.Control>
                <Button type="submit" variant="outline-success" className="p-2">
                    Search
                </Button>
            </Form>
        );
    }
}

export default SearchBox;