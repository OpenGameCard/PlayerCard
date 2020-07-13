import CoursesService from '../services/courses.service'


export const courses = {
  namespaced: true,
  actions: {
    get({commit}, course_id) {
      return CoursesService.get(course_id).then(
        course => {
          commit('getSuccess', course);
          return Promise.resolve(course);
        },
        error => {
          commit('getFailure');
          return Promise.reject(error);
        }
      );
    },
    postRating({commit}, payload) {
      return CoursesService.saveRatings(payload.course_id, payload.rating).then(
        rating => {
          commit('postRatingSuccess', rating);
          return Promise.resolve(rating);
        },
        error => {
          commit('postRatingFailure');
          return Promise.reject(error);
        }
      )
    },
    postReview({commit}, payload) {
      return CoursesService.saveReview(payload.course_id, payload.review).then(
        review => {
          commit('postReviewSuccess', review);
          return Promise.resolve(review);
        },
        error => {
          commit('postReviewFailure');
          return Promise.reject(error);
        }
      )
    }
  },
  mutations: {
    getSuccess(state, course) {
      state.course = course;
    },
    getFailure(state) {
      state.course = null;
    },
    postRatingSuccess(state, rating) {
      state.rating = rating;
    },
    postRatingFailure(state) {
      state.rating = null;
    },
    postReviewSuccess(state, review) {
      state.review = review;
    },
    postReviewFailure(state) {
      state.review = null;
    },
  }
}
