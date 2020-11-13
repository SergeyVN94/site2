enum CHART_CLASSES {
  REVIEWS_CHART = 'js-reviews-chart',
  IMAGE = 'js-reviews-chart__chart-image',
  VALUE_OUT = 'js-reviews-chart__value',
  LEGEND_ITEM = 'js-reviews-chart__legend-item',
}

type TypesOfReviews = 'very-good' | 'good' | 'fine' | 'bad';

class ReviewsChart {
  private readonly typesOfReviews: TypesOfReviews[];

  private readonly paths: {
    [key in TypesOfReviews]?: {
      $path: JQuery<SVGPathElement>;
      d: string;
      expandedD: string;
      strokeWidth: string;
      expandedStrokeWidth: string;
    }
  };

  private allReviews: string;

  private $reviewsOut: JQuery;

  constructor($chart: JQuery) {
    this.typesOfReviews = [];
    this.paths = {};
    this.init($chart);
  }

  private init($chart: JQuery): void {
    $chart.find('path').each((_, path) => {
      const $path = $(path);
      const type = $path.data('theme') as TypesOfReviews;
      this.typesOfReviews.push(type);

      this.paths[type] = {
        $path,
        d: $path.data('path'),
        expandedD: $path.data('path-expanded'),
        strokeWidth: $path.data('stroke-width'),
        expandedStrokeWidth: $path.data('stroke-width-expanded'),
      };

      $path.on('mouseover', this.handleMouseover.bind(this))
        .on('mouseout', this.handleMouseout.bind(this));
    });

    $chart.find(`.${CHART_CLASSES.LEGEND_ITEM}`).on('mouseover', this.handleMouseover.bind(this))
      .on('mouseout', this.handleMouseout.bind(this));

    this.$reviewsOut = $chart.find(`.${CHART_CLASSES.VALUE_OUT}`);
    this.allReviews = this.$reviewsOut.text();
  }

  private resetSvg(): void {
    this.typesOfReviews.forEach((type) => {
      const path = this.paths[type];
      path.$path.attr('d', path.d).attr('stroke-width', path.strokeWidth);
    });

    this.$reviewsOut.text(this.allReviews);
  }

  private handleMouseout(): void {
    this.resetSvg();
  }

  private handleMouseover(ev: JQuery.MouseOverEvent): void {
    this.resetSvg();
    const target = $(ev.currentTarget);
    const type = target.data('theme') as TypesOfReviews;

    if (this.typesOfReviews.includes(type)) {
      const path = this.paths[type];
      path.$path.attr('d', path.expandedD).attr('stroke-width', path.expandedStrokeWidth);
    }

    this.$reviewsOut.text(target.data('value'));
  }
}

$(`.${CHART_CLASSES.REVIEWS_CHART}`).each((_, chart) => {
  new ReviewsChart($(chart));
});
