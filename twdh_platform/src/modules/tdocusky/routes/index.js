export default [
  {
    path: '/tdocuskyIndex',
    name: 'TdocuSkyIndex',
    component: () => import(/* webpackChunkName: "tdocuskyIndex" */ '../views/TdocuSkyIndex.vue'),
    meta: {
      prev: 'OpendataIndex',
    }
  },
]
