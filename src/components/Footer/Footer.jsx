import React, { Component } from "react";
import "./Footer.css";

class Footer extends Component {
    render() {
        const { counterOfCompleted, clearCompleted, setFilter, currentFilter } = this.props;

        return (
            <footer className="footer">
                <span className="todo-count">{counterOfCompleted} items left</span>
                <ul className="filters">
                    <li>
                        <button
                            className={currentFilter === 'all' ? 'selected' : ''}
                            onClick={() => setFilter('all')}
                        >
                            All
                        </button>
                    </li>
                    <li>
                        <button
                            className={currentFilter === 'active' ? 'selected' : ''}
                            onClick={() => setFilter('active')}
                        >
                            Active
                        </button>
                    </li>
                    <li>
                        <button
                            className={currentFilter === 'completed' ? 'selected' : ''}
                            onClick={() => setFilter('completed')}
                        >
                            Completed
                        </button>
                    </li>
                </ul>
                <button
                    className="clear-completed"
                    onClick={clearCompleted}
                >
                    Clear-completed
                </button>
            </footer>
        );
    }
}

export default Footer;