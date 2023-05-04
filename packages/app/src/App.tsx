import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  AuthPage,
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
} from "@refinedev/mui";

import { CssBaseline, GlobalStyles } from "@mui/material";
import { dataProvider, liveProvider } from "@refinedev/appwrite";
import routerBindings, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";

import { useTranslation } from "react-i18next";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { appwriteClient } from "utility";
import { authProvider } from "./authProvider";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";

import {
  ChatBubbleOutline,
  PeopleAltOutlined,
  VerifiedUserOutlined,
} from "@mui/icons-material";
import {
  CredentialList,
  CredentialShow,
  CredentialCreate,
} from "pages/credentials";
import { IdentifierList, IdentifierCreate } from "pages/identifiers";
import { MuiInferencer } from "@refinedev/inferencer/mui";
import { Home } from "pages/home";
import { dataProvider as veramoDataProvider } from "veramoDataProvider";
//import { DemoBanner } from "components/DemoBanner"

function App() {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <BrowserRouter>
      {/* <DemoBanner/> */}
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={{
                // default: dataProvider("https://api.fake-rest.refine.dev"),
                agent: veramoDataProvider(),
                default: veramoDataProvider(),
                // default: dataProvider(appwriteClient, {
                //     databaseId: "database",
                //   })
              }}
              liveProvider={liveProvider(appwriteClient, {
                databaseId: "database",
              })}
              authProvider={authProvider}
              notificationProvider={notificationProvider}
              routerProvider={routerBindings}
              i18nProvider={i18nProvider}
              resources={[
                {
                  name: "identifiers",
                  list: '/identifiers',
                  show: '/identifiers/show/:id',
                  create: '/identifiers/create',
                  edit: '/identifiers/edit/:id',
                  icon: <PeopleAltOutlined />,
                  meta: {
                    dataProviderName: "agent",
                  },
                },
                {
                  name: "credentials",
                  list: '/credentials',
                  show: '/credentials/show/:id',
                  create: '/credentials/create',
                  edit: '/credentials/edit/:id',
                  icon: <VerifiedUserOutlined />,
                  meta: {
                    dataProviderName: "agent",
                  },
                },
                {
                  name: "messages",
                  list: '/messages',
                  show: '/messages/show/:id',
                  create: '/messages/create',
                  edit: '/messages/edit/:id',
                  icon: <ChatBubbleOutline />,
                  meta: {
                    dataProviderName: "agent",
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                      <ThemedLayoutV2 Header={() => <Header isSticky={true} />}>
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route
                    index
                    element={<Home/>}
                  />
                  <Route path="/identifiers">
                    <Route index element={<IdentifierList />} />
                    {/* <Route path="create" element={<IdentifierCreate />} />
                    <Route path="edit/:id" element={<MuiInferencer />} /> */}
                    <Route path="show/:id" element={<MuiInferencer />} />
                  </Route>
                  <Route path="/credentials">
                    <Route index element={<CredentialList />} />
                    {/* <Route path="create" element={<CredentialCreate />} />
                    <Route path="edit/:id" element={<MuiInferencer />} /> */}
                    <Route path="show/:id" element={<MuiInferencer />} />
                  </Route>
                  {/* <Route path="/activity">
                    <Route index element={<Activity />} />
                    <Route path="create" element={<CategoryCreate />} />
                    <Route path="edit/:id" element={<CategoryEdit />} />
                    <Route path="show/:id" element={<CategoryShow />} />
                  </Route> */}
                  {/* <Route path="/requests">
                    <Route index element={<Requests />} />
                    <Route path="create" element={<CategoryCreate />} />
                    <Route path="edit/:id" element={<CategoryEdit />} />
                    <Route path="show/:id" element={<CategoryShow />} />
                  </Route> */}
                  <Route path="/messages">
                    <Route index element={<MuiInferencer />} />
                    {/* <Route path="create" element={<MuiInferencer />} />
                    <Route path="edit/:id" element={<MuiInferencer />} /> */}
                    <Route path="show/:id" element={<MuiInferencer />} />
                  </Route>
                  {/* <Route path="/profile">
                    <Route index element={<MyProfile />} />
                    <Route path="create" element={<CategoryCreate />} />
                    <Route path="edit/:id" element={<CategoryEdit />} />
                    <Route path="show/:id" element={<CategoryShow />} />
                  </Route> */}
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
                <Route
                  element={
                    <Authenticated fallback={<Outlet />}>
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route
                    path="/login"
                    element={
                      <AuthPage
                        type="login"
                        formProps={{
                          defaultValues: {
                            email: "demo@refine.dev",
                            password: "demodemo",
                          },
                        }}
                      />
                    }
                  />
                  <Route
                    path="/register"
                    element={<AuthPage type="register" />}
                  />
                  <Route
                    path="/forgot-password"
                    element={<AuthPage type="forgotPassword" />}
                  />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
