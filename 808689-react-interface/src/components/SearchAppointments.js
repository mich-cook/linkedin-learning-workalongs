import React, { Component } from 'react';

export default class SearchAppointments extends Component {
  render() {
    return (
      <div>
        <input type="text" name="keywords" onChange={ e => this.props.searchAppointments(e.target.value)} />
        <button type="button" className="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sort By:</button>

        <button
          className={ "sort-by dropdown-item" + (this.props.orderBy === "petName" ? "active":"")}
          onClick={ e => this.props.changeOrder('petName', this.props.orderDir)}
        >Pet Name</button>
        <button
          className={ "sort-by dropdown-item" + (this.props.orderBy === "aptDate" ? "active":"")}
          onClick={ e => this.props.changeOrder('aptDate', this.props.orderDir)}
        >Date</button>
        <button
          className={ "sort-by dropdown-item" + (this.props.orderBy === "ownerName" ? "active":"")}
          onClick={ e => this.props.changeOrder('ownerName', this.props.orderDir)}
        >Owner</button>

        <hr />

        <button
          className={ "sort-by dropdown-item" + (this.props.orderDir === "asc" ? "active":"")}
          onClick={ e => this.props.changeOrder(this.props.orderBy, "asc")}
        >Ascending</button>
        <button
          className={ "sort-by dropdown-item" + (this.props.orderDir === "desc" ? "active":"")}
          onClick={ e => this.props.changeOrder(this.props.orderBy, "desc")}
        >Descending</button>
      </div>
    );
  }
}
