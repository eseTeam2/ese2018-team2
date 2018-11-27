export interface CreateRangeFilterResult {
  range: object;
}

export interface CreateMatchQueryResult {
  query: object;
};

export const createMatchQuery = (field: string, value: string): CreateMatchQueryResult => (
  {
    query: {
      match: {
        [field]: value,
      }
    }
  }
);

export const createRangeFilter = (
  field: string,
  min: number,
  max: number
): CreateRangeFilterResult | {} => {
  if (min != undefined && max != undefined) {
    return {
      range: {
        [field]: {
          gte: min,
          lte: max
        }
      }
    };
  }

  if (max) {
    return {
      range: {
        [field]: {
          lte: max
        }
      }
    };
  }

  if (min) {
    return {
      range: {
        [field]: {
          gte: min
        }
      }
    };
  }

  return {};
};

export const createQuery = (ranges: Array<CreateRangeFilterResult|{}>) => {
  const filteredRanges = ranges.filter((e:any) => e.range)
  if (filteredRanges.length === 0) {
    return {}
  }

  return {
    query: {
      bool: {
        filter: [
          ...ranges
        ]
      }
    }
  };
};
