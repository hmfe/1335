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
                <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h2 style={{ fontSize: '24px' }}> Search History: </h2>
                    <button type="button" className="btn btn-link" onClick={() => this.clearHistory()}> Clear History </button>
                </section>
                <hr></hr>
                <ul>
                    {this.props.searchHistoryItems.map((item, index) => {
                        return (
                            <React.Fragment key={item.name + index}>
                                <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }} key={item.name + index}>
                                    <h3 style={{ fontSize: "16px", marginRight: 'auto' }}>{item.name}</h3>
                                    <time style={{ marginRight: '20px', fontSize: '12px', color: 'grey' }} dateTime="item.dateModified.toLocaleTimeString('sv-SE')">
                                        {item.dateModified.toLocaleTimeString("sv-SE", { dateStyle: 'short', timeStyle : 'short', hour12: 'true' })}
                                    </time>
                                    <button type="button" aria-label="Delete" className="del-btn" onClick={() => this.onDeleteRecord(item)}></button>
                                </li>
                                <hr></hr>
                            </React.Fragment>
                        );
                    })}
                </ul>
            </article>
        );
    }
}

export default SearchHistory;