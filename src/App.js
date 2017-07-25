import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class ProductListFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText : "",
      inStockOnly : false
    }
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockOnlyChange = this.handleInStockOnlyChange.bind(this);
  }

  handleFilterTextChange(text) {
    this.setState({
      filterText: text
    });
  }

  handleInStockOnlyChange(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly
    });
  }

  render() {
    return (
      <div>
        <SearchBar 
          filterText={this.state.filterText} 
          inStockOnly={this.state.inStockOnly} 
          onFilterTextChange={this.handleFilterTextChange}
          onInStockOnlyChange={this.handleInStockOnlyChange} />
        <ProductListTable 
          products={this.props.products}
          filterText={this.state.filterText} 
          inStockOnly={this.state.inStockOnly} />
      </div>
    );
  }
}

class SearchBar extends Component {
  constructor(props){
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockOnlyChange = this.handleInStockOnlyChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  handleInStockOnlyChange(e) {
    this.props.onInStockOnlyChange(e.target.checked);
  }

  render() {
    return (
      <div>
        <input type="text" placeholder="Search" value={this.props.filterText} onChange={this.handleFilterTextChange} />
        <div>
          <input id="chkProductOnly" type="checkbox" 
            checked={this.props.inStockOnly}
            onChange={this.handleInStockOnlyChange} />
          <label htmlFor="chkProductOnly">Only show products in stock</label>
        </div>
      </div>
    );
  }
}

class ProductListTable extends Component {
  render() {
    const products = this.props.products;
    const rows = []
    let lastCategory = undefined;

    products.forEach(function(product) {
      if ((!product.name.includes(this.props.filterText)) || (this.props.inStockOnly && !product.stocked)) {
        return;
      }
      if (product.category !== lastCategory) {
        lastCategory = product.category;
        rows.push(<CategoryRow category={lastCategory} />);
      }
      rows.push(<ProductRow product={product} />);
    }, this);

    return (
      <table>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
        {rows}
      </table>
    );
  }
}

class ProductRow extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.product.name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }
}

class CategoryRow extends Component {
  render() {
    return (
      <tr>
        <th colSpan="2">{this.props.category}</th>
      </tr>
    );
  }
}

export default ProductListFilter;
