export default [
  {
    path: '/opendataIndex',
    name: 'OpendataIndex',
    component: () => import(/* webpackChunkName: "opendataIndex" */ '../views/OpendataIndex.vue'),
    meta: {
      prev: 'System',
      next: 'TdocuSkyIndex',
    }
  },
  {
    path: '/retrieval',
    name: 'Retrieval',
    component: () => import(/* webpackChunkName: "retrieval" */ '../views/Retrieval.vue')
  },
]