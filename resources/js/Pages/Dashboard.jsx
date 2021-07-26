import Authenticated from '@/Layouts/Authenticated';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './Search';
import Table from './Table';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Dashboard(props) {
  const [posts, setPosts] = useState(props.posts.data);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(2);


  // we will render the table if anything
  // got change in posts state
  useEffect(() => { }, [posts])

  // fetch the next page data
  const nextPage = () => {
    setPage(prevPage => prevPage + 1);
    axios.get(`/dashboard/?page=${page}`).then(res => {
      let nextPosts = res.data.data;
      setPosts([...posts, ...nextPosts]);
    })
  }

  // fetch data in search next page
  const nextSearchPage = async () => {
    setPage(prevPage => prevPage + 1);
    await axios.get(`/dashboard/search/${search}?page=${page}`).then(res => {
      let nextPosts = res.data.data;
      setPosts([...posts, ...nextPosts]);
    })
  }

  // handle search
  const handleSearch = async (searchData) => {
    setPage(2);
    setSearch(searchData);
    if (search) {
      let url = `/dashboard/search/${searchData}`;

      await axios.get(url).then(res => {
        setPosts(res.data.data);
      }).catch(error => { })
    }
  }

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Search
            handleSearch={handleSearch}
          />
          {
            search ?
              <InfiniteScroll
                dataLength={posts.length}
                next={nextSearchPage}
                hasMore={true}
              >
                <Table
                  posts={posts}
                />
              </InfiniteScroll> :
              <InfiniteScroll
                dataLength={posts.length}
                next={nextPage}
                hasMore={true}
              >
                <Table
                  posts={posts}
                />
              </InfiniteScroll>
          }

        </div>
      </div>
    </Authenticated>
  );
}
