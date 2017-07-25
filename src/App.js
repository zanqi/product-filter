import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class ProductListFilter extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <ProductListTable products={this.props.products}/>
      </div>
    );
  }
}

class SearchBar extends Component {
  render() {
    return (
      <div>
        <input type="text" placeholder="Search" />
        <div>
          <input id="chkProductOnly" type="checkbox"/>
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
    return null;
  }
}

class CategoryRow extends Component {
  render() {
    return null;
  }
}

export default ProductListFilter;
