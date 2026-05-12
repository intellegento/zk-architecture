import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksFounder extends Struct.ComponentSchema {
  collectionName: 'components_blocks_founders';
  info: {
    displayName: 'Founder';
    icon: 'archive';
  };
  attributes: {
    bio: Schema.Attribute.RichText &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    photo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    position: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksPhilosophy extends Struct.ComponentSchema {
  collectionName: 'components_blocks_philosophies';
  info: {
    displayName: 'Philosophy';
    icon: 'archive';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksProject extends Struct.ComponentSchema {
  collectionName: 'components_blocks_projects';
  info: {
    description: '';
    displayName: 'Project';
    icon: 'archive';
  };
  attributes: {
    link: Schema.Attribute.String;
    mediaDesktop: Schema.Attribute.Media<'images' | 'videos'> &
      Schema.Attribute.Required;
    mediaMobile: Schema.Attribute.Media<'images' | 'videos'> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.String & Schema.Attribute.Required;
    year: Schema.Attribute.Integer & Schema.Attribute.Required;
  };
}

export interface BlocksProjectArchitectureMedia extends Struct.ComponentSchema {
  collectionName: 'components_blocks_project_architecture_medias';
  info: {
    description: '';
    displayName: 'ProjectDetailedMedia';
    icon: 'archive';
  };
  attributes: {
    original: Schema.Attribute.Media<'images'>;
    preview: Schema.Attribute.Media<'images'>;
    type: Schema.Attribute.Enumeration<['desktop', 'mobile', 'all']> &
      Schema.Attribute.DefaultTo<'all'>;
  };
}

export interface BlocksProjectDescription extends Struct.ComponentSchema {
  collectionName: 'components_blocks_project_descriptions';
  info: {
    description: '';
    displayName: 'ProjectDescription';
    icon: 'archive';
  };
  attributes: {
    info: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface BlocksProjectDetailed extends Struct.ComponentSchema {
  collectionName: 'components_blocks_project_detaileds';
  info: {
    description: '';
    displayName: 'projectDetailed';
    icon: 'archive';
  };
  attributes: {
    images: Schema.Attribute.Component<
      'blocks.project-architecture-media',
      true
    >;
    sliderImages: Schema.Attribute.Component<'blocks.project-media', true>;
    sliderTitle: Schema.Attribute.String;
    text: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.String;
    top: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface BlocksProjectMedia extends Struct.ComponentSchema {
  collectionName: 'components_blocks_project_medias';
  info: {
    description: '';
    displayName: 'ProjectMedia';
    icon: 'archive';
  };
  attributes: {
    media: Schema.Attribute.Media<'images' | 'videos'>;
    type: Schema.Attribute.Enumeration<['desktop', 'mobile', 'all']> &
      Schema.Attribute.DefaultTo<'all'>;
  };
}

export interface BlocksServiceSlide extends Struct.ComponentSchema {
  collectionName: 'components_blocks_service_slides';
  info: {
    description: '';
    displayName: 'ServiceSlide';
    icon: 'archive';
  };
  attributes: {
    slideItems: Schema.Attribute.Component<'blocks.service-slide-item', true> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksServiceSlideItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_service_slide_items';
  info: {
    displayName: 'ServiceSlideItem';
    icon: 'archive';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_blocks_social_links';
  info: {
    displayName: 'SocialLink';
    icon: 'archive';
  };
  attributes: {
    platform: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.founder': BlocksFounder;
      'blocks.philosophy': BlocksPhilosophy;
      'blocks.project': BlocksProject;
      'blocks.project-architecture-media': BlocksProjectArchitectureMedia;
      'blocks.project-description': BlocksProjectDescription;
      'blocks.project-detailed': BlocksProjectDetailed;
      'blocks.project-media': BlocksProjectMedia;
      'blocks.service-slide': BlocksServiceSlide;
      'blocks.service-slide-item': BlocksServiceSlideItem;
      'blocks.social-link': BlocksSocialLink;
    }
  }
}
