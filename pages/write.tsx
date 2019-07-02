import Layout from '@/components/layouts/DefaultLayout';
import { PageFC } from '@/components/SortApp';
import EditorForm from '@/components/write/EditorForm';
import MediaLibrary from '@/components/write/MediaLibrary';
import SubmitModal from '@/components/write/SubmitModal';
import { getBlogPost } from '@/lib/firebase/firestore/blog';
import { PostModel } from '@/models/blog';
import { authStoreCtx } from '@/stores/auth';
import { useGlobalStore } from '@/stores/global';
import { writeStoreCtx } from '@/stores/write';
import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';
import React, { useContext, useEffect } from 'react';

const UnauthorizedWarning = dynamic(
  () => import('../components/common/UnauthorizedWarning'),
  {
    ssr: false,
  },
);

interface WriteProps {
  post?: PostModel;
}

const render = (flag: boolean, content: JSX.Element): JSX.Element => {
  return flag ? content : <h1>Loading...</h1>;
};

const Write: PageFC<WriteProps> = ({ post }) => {
  useGlobalStore();

  const authStore = useContext(authStoreCtx);
  const writeStore = useContext(writeStoreCtx);

  // fetch 1st page of media
  useEffect(() => {
    writeStore.MediaStore.fetchMedia();
  }, []);

  // re-set post whenever the reference changes
  useEffect(() => {
    post && writeStore.setPost(post);
  }, [post]);

  return (
    <Layout>
      <main>
        {render(
          process.browser && authStore.initialized,
          <>
            <MediaLibrary mediaStore={writeStore.MediaStore} />
            <EditorForm initialState={post && post.content} />
          </>,
        )}
      </main>
      <button onClick={authStore.signOut}>Sign Out</button>
      <UnauthorizedWarning />
      <SubmitModal />
    </Layout>
  );
};
Write.getInitialProps = async ({ query }) => {
  const slug = query.slug as string;

  if (!slug) {
    return { statusCode: 404 };
  }

  try {
    const post = await getBlogPost(slug);
    return { post };
  } catch (_) {
    return { statusCode: 404 };
  }
};

export default observer(Write);
