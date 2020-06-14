// @flow

import React from 'react';
import { ActivityIndicator, SectionList } from 'react-native';
import Container from 'components/common/layout/Container';
import { colors } from 'styles';
import InterestItem from 'containers/interests/InterestItem';
import InterestSectionHeader from 'components/interests/InterestSectionHeader';
import EventItemSeparator from 'components/events/EventItemSeparator';
import renderIf from 'utils/renderIf';

type Props = {
  interests: Object[],
};

// eslint-disable-next-line react/prefer-stateless-function
class InterestSectionList extends React.Component<Props> {
  render() {
    const { interests } = this.props;

    if (interests && interests.length === 0) {
      return (
        <Container center>
          <ActivityIndicator color={colors.white} size="large" />
        </Container>
      );
    }
    return (
      <SectionList
        renderItem={section => renderIf(section.section.id)(<InterestItem {...section} />)}
        renderSectionHeader={section => <InterestSectionHeader {...section} />}
        sections={interests}
        keyExtractor={item => item.id}
        stickySectionHeadersEnabled
        ItemSeparatorComponent={section => renderIf(section.section.id)(<EventItemSeparator />)}
        showsVerticalScrollIndicator={false}
      />
    );
  }
}

export default InterestSectionList;
