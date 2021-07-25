import Authenticated from '@/Layouts/Authenticated';
import React, { useState, useEffect } from 'react';
import Search from './Search';
import Table from './Table';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';

export default function Dashboard(props) {
  const [posts, setPosts] = useState(props.posts.data);
  const [page, setPage] = useState(2)


  useEffect(() => {}, [posts])

  // fetch the next page data
  const nextPage = () => {
    setPage(prevPage => prevPage + 1);
    axios.get(`/dashboard/?page=${page}`).then(res => {
      // console.log(res.data.data);
      let nextPosts = res.data.data;
      setPosts([...posts,...nextPosts]);
    })
  }

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Search />
          <InfiniteScroll
            dataLength={posts.length}
            next={nextPage}
            hasMore={true}
          >
            <Table
              posts={posts}
            />
          </InfiniteScroll>
        </div>
      </div>
    </Authenticated>
  );
}