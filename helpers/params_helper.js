const bodyTypes = ['Slender', 'Average', 'Curvy', 'Overweight', 'Athletic'];
const maritalStatus = ['Single', 'Dating', 'Married', 'Other'];

const formatSearchParams = (search, locations, userId) => {
  let searchParams = {
    locationId: locations
  };
  if (search) {
    searchParams.userId = {
      $ne: userId
    };

    if (search.profile.gender) {
      searchParams.gender = search.profile.gender;
    }

    if (search.profile.minAge && search.profile.maxAge) {
      searchParams.age = {
        $between: [search.profile.minAge, search.profile.maxAge]
      };
    } else {
      if (search.profile.minAge) {
        searchParams.age = { $gte: search.profile.minAge };
      }
      if (search.profile.maxAge) {
        searchParams.age = { $lte: search.profile.maxAge };
      }
    }

    if (search.profile.minHeight && search.profile.maxHeight) {
      searchParams.height = {
        $between: [search.profile.minHeight, search.profile.maxHeight]
      };
    } else {
      if (search.profile.minHeight) {
        searchParams.height = { $gte: search.profile.minHeight };
      }
      if (search.profile.maxHeight) {
        searchParams.height = { $lte: search.profile.maxHeight };
      }
    }

    searchParams.bodyType = {
      $in: search.profile.bodyType || bodyTypes
    };

    searchParams.maritalStatus = {
      $in: search.profile.maritalStatus || maritalStatus
    };

    if (search.profile.children) {
      searchParams.children = search.profile.children;
    }

    if (search.profile.occupation !== '') {
      searchParams.occupation = {
        $iLike: `%${search.profile.occupation}%`
      };
    }
  }

  return searchParams;
};

module.exports = { formatSearchParams };
