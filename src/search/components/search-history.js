import React from 'react'

class SearchHistory extends React.Component {
    constructor() {
        super();
        this.onDeleteRecord = this.onDeleteRecord.bind(this);
        this.onClearHistory = this.clearHistory.bind(this);
    }
    onDeleteRecord(event) {
        this.props.onDeleteRecord(event);
    }
    clearHistory() {
        this.props.onClearHistory();
    }
    render() {

        return (

            <article>
                <hr></hr>
                <section className="clearfix">
                    <h5 className="float-left"> Search History: </h5>
                    <div className="float-right">
                        <button type="button" className="btn btn-link" onClick={() => this.clearHistory()}> Clear History </button>
                    </div>
                </section>
                <hr></hr>
                <ul className="list-group overflow-auto">
                    {this.props.searchHistoryItems.map((item, index) => {
                        return (
                            <li className='list-group-item clearfix' key={item.name}>
                                {item.name}
                                <time className="badge badge-info ml-md-2">
                                    {item.dateModified.toLocaleTimeString("sv-SE")}
                                </time>
                                <span className="float-right button-group">
                                    <button type="button" className="del-btn" onClick={() => this.onDeleteRecord(item)}></button>
                                </span>

                            </li>
                        );
                    })}
                </ul>
            </article>
        );
    }
}

export default SearchHistory;