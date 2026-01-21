// orderSaga.js এর একটি অংশ
function* getOrdersSaga() {
  try {
    yield put(setLoading(true));
    const snapshot = yield call(firebase.getAllOrders);
    const orders = [];
    snapshot.forEach(doc => orders.push({ id: doc.id, ...doc.data() }));
    yield put(getOrdersSuccess(orders)); // আপনার অ্যাকশন
  } catch (e) {
    console.error(e);
  } finally {
    yield put(setLoading(false));
  }
}