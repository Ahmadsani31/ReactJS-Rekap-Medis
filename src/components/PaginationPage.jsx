import React from 'react';
import { Link } from 'react-router-dom';

const PaginationPage = ({ dataPage, paginatePage }) => {
    return (
        <div className="flex flex-col items-center py-3">
            <span className="text-sm text-gray-700 dark:text-gray-400">
                Showing <span className="font-semibold text-gray-900 dark:text-white">{dataPage.from} </span> to <span className="font-semibold text-gray-900 dark:text-white">{dataPage.to}</span> of <span className="font-semibold text-gray-900 dark:text-white">{dataPage.total}</span> Entries
            </span>
            <div className="inline-flex mt-2 xs:mt-0">
                <nav aria-label="Page navigation example">

                    <ul className="flex justify-between items-center -space-x-px h-10 text-base">
                        {dataPage.links?.map((link, i) => (
                            <li key={i}>
                                {link.active ? (
                                    <button type="button" aria-current="page" className="flex items-center justify-center px-4 h-10 text-blue-800 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">{link.label}</button>
                                ) : link.url == null ? (

                                    <button type="button" className="text-gray-300  dark:bg-blue-500 border border-gray-300 cursor-not-allowed font-medium rounded text-sm px-4 h-10 ms-0 text-center" disabled>{link.label.replace('&laquo;', '').replace('&raquo;', '')}</button>

                                ) : (
                                    <Link onClick={() => paginatePage(link.url)} className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border  rounded border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{link.label.replace('&laquo;', '').replace('&raquo;', '')}</Link>
                                )}
                            </li>
                        ))}

                    </ul>
                </nav>
            </div>
        </div>
    )
};

export default PaginationPage;