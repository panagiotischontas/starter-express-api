
import mongoose, { Schema } from 'mongoose';
const formSchema = new Schema({
    activity: {
        retired: Boolean,
        studying: Boolean,
        unemployed: Boolean,
        working: Boolean,
    },
    age: Number,
    deviceMostTimeSpent: {
        smartband: Number,
        smartphone: Number,
        smartwatch: Number,
        tablet: Number,
    },
    doubleTapExperienceFeeling: String,
    doubleTapNavigate: Number,
    doubleTapRateExperience: Number,
    easierDoubleTapOrPinchSpread: String,
    easierSwipeOrScroll: String,
    education: String,
    gender: String,
    likeDoubleTapOrPinchSpread: String,
    likeSwipeOrScroll: String,
    monthlyAmount: String,
    ownedDevices: {
        smartband: Boolean,
        smartphone: Boolean,
        smartwatch: Boolean,
        tablet: Boolean,
    },
    pinchSpreadExperienceFeeling: String,
    pinchSpreadRateExperience: Number,
    reasons: {
        communication: Boolean,
        entertainment: Boolean,
        health: Boolean,
        information: Boolean,
        organising: Boolean,
        reading: Boolean,
    },
    scrollExperienceFeeling: String,
    scrollNavigate: Number,
    scrollRateExperience: Number,
    subscription: String,
    subscriptionAmount: String,
    swipeData: {
        timeAfterHint: Number,
        timeUntilAction: Number,
        totalTime: Number,
    },
    swipeExperienceFeeling: String,
    swipeNavigate: Number,
    swipeOrScroll: String,
    swipeRateExperience: Number,
    timeSpent: Number,
    usingSmartDevices: Number,
    workIndustry: String,
    zoom: String,
    zoomEffective: Number,
    scrollData: {
        timeAfterHint: Number,
        timeUntilAction: Number,
        totalTime: Number,
    },
    pinchSpreadData: {
        timeAfterHint: Number,
        timeUntilAction: Number,
        totalTime: Number,
    },
    doubleTapData: {
        timeAfterHint: Number,
        timeUntilAction: Number,
        totalTime: Number,
    },
    swipeBestExperience: String,
    scrollBestExperience: String,
    doubleTapBestExperience: String,
    pinchSpreadBestExperience: String,
    birthday: Date,
    country: String,
});

export default mongoose.model('formular', formSchema);