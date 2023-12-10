import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Friends from './pages/friends';
import Settings from './pages/Settings';
import Analysis from './pages/Analysis';
import Rating from './pages/Rating';
import AddSongs from './pages/AddSongs';
import Recommendations from './pages/Recommendations';
import ArtistProfile from './pages/ArtistPage';
import AlbumPage from './pages/AlbumPage';
import Search from './pages/Search';
import Modal from './components/UserEntry/EntranceModal';
import UserPage from './pages/UserPage';
import { RequireAuth } from 'react-auth-kit'
import { useIsAuthenticated } from 'react-auth-kit'
import { useAuthUser } from 'react-auth-kit'
import UserProfile from './pages/UserProfile';
import GroupPage from "./pages/GroupPage.tsx";
import SharePage from "./pages/ShareContent.tsx";

const AppRouter = () => {

  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();

  if (isAuthenticated()) {
    var username = auth()?.username;
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route 
          path="/:username"
          element={
            <RequireAuth loginPath="/signin">
              <UserPage user={username}/>
            </RequireAuth>
          } 
        />
          <Route
              path="/:username/share"
              element={
                  <RequireAuth loginPath="/signin">
                      <SharePage />
                  </RequireAuth>
              }
          />
          <Route path="/user/:userId" element={<UserProfile />} />
        <Route 
          path="/:username/analysis"
          element={
            <RequireAuth loginPath="/signin">
              <Analysis />
            </RequireAuth>
          } 
        />
          <Route
              path="/group/:groupName"
              element={
                  <RequireAuth loginPath="/signin">
                      <GroupPage  />
                  </RequireAuth>
              }
          />
        <Route 
          path="/:username/friends"
          element={
            <RequireAuth loginPath="/signin">
              <Friends />
            </RequireAuth>
          } 
        />
        <Route 
          path="/:username/addsongs"
          element={
            <RequireAuth loginPath="/signin">
              <AddSongs/>
            </RequireAuth>
          } 
        />
        <Route 
          path="/:username/analysis"
          element={
            <RequireAuth loginPath="/signin">
              <Analysis />
            </RequireAuth>
          } 
        />
          <Route
              path="/artist/:performer"
              element={
                  <RequireAuth loginPath="/signin">
                      <ArtistProfile />
                  </RequireAuth>
              }
          />
          <Route
              path="/album/:album"
              element={
                  <RequireAuth loginPath="/signin">
                      <AlbumPage  />
                  </RequireAuth>
              }
          />
          <Route
          path="/:username/rating"
          element={
            <RequireAuth loginPath="/signin">
              <Rating />
            </RequireAuth>
          } 
        />
        <Route 
          path="/:username/recommendations"
          element={
            <RequireAuth loginPath="/signin">
              <Recommendations />
            </RequireAuth>
          } 
        />
          <Route
              path="/:username/search"
              element={
                  <RequireAuth loginPath="/signin">
                      <Search />
                  </RequireAuth>
              }
          />
          <Route
              path="/:username/settings"
              element={
                  <RequireAuth loginPath="/signin">
                      <Settings />
                  </RequireAuth>
              }
          />
        <Route
          path="/signin"
          element={<Modal formType={'signin'} closeUserEntry={function (): void {
            throw new Error('Function not implemented.');
          } } />}
        />
        <Route
          path="/signup"
          element={<Modal formType={'signup'} closeUserEntry={function (): void {
            throw new Error('Function not implemented.');
          } } />}
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;